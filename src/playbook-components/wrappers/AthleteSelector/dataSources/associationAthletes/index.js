// @flow

import { useEffect, useMemo, useState } from 'react';
import getAssociationHierarchy from '@kitman/services/src/services/athlete/associationHierarchy/getAssociationHierarchy';
import type { AthletesInAssociationHierarchy } from '@kitman/services/src/services/athlete/associationHierarchy/types';
import i18n from '@kitman/common/src/utils/i18n';
import type { UseDataResult } from '../../shared/types';
import {
  mapAthletesToOrganizationGroups,
  mapAthleteToSquadGroups,
} from './mappers';

const AssociationGroups = {
  ORGANISATION: 'organisation',
  SQUAD: 'squad',
};

type IdentifierType = 'userId' | 'athleteId';

type Params = {
  skip?: boolean,
  identifier?: IdentifierType,
};

const getMapper = (identifier: IdentifierType) => ({
  [AssociationGroups.ORGANISATION]: mapAthletesToOrganizationGroups({
    identifier,
  }),
  [AssociationGroups.SQUAD]: mapAthleteToSquadGroups({ identifier }),
});

const labels = {
  [AssociationGroups.ORGANISATION]: i18n.t('Club') ?? 'Club',
  [AssociationGroups.SQUAD]: i18n.t('Squad') ?? 'Squad',
};

const useAssociationAthletes = (params?: Params): UseDataResult => {
  const [groupMode, setGroupMode] = useState<string>(
    AssociationGroups.ORGANISATION
  );
  const [isLoading, setIsLoading] = useState(!params?.skip);
  const [data, setData] = useState<AthletesInAssociationHierarchy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const identifier = params?.identifier ?? 'athleteId';

  useEffect(() => {
    let cancelled = false;

    if (!params?.skip) {
      (async () => {
        setIsLoading(true);
        setError(null);

        try {
          const associationData = await getAssociationHierarchy();
          setData(associationData);
          setIsLoading(false);
        } catch (err) {
          if (!cancelled) {
            setError(err?.message || 'Failed to load athletes');
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      })();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const mappedData = useMemo(() => {
    if (!data) {
      return {
        groups: [],
        athletes: [],
      };
    }

    return getMapper(identifier)[groupMode](data);
  }, [identifier, data, groupMode]);

  const grouping = {
    options: (Object.keys(labels): Array<$Keys<typeof labels>>).map((key) => ({
      value: key,
      label: labels[key],
    })),
    current: groupMode,
    setCurrent: setGroupMode,
  };

  return {
    isLoading,
    groups: mappedData.groups,
    athletes: mappedData.athletes,
    error,
    grouping,
  };
};

export { useAssociationAthletes };
