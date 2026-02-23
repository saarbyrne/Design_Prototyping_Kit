// @flow

import { MAX_LIST_ITEM_CHARS } from './constants';

export function getTruncatedText(
  text: string,
  max: number = MAX_LIST_ITEM_CHARS,
): {|
  display: string,
  isTruncated: boolean,
|} {
  if (text.length <= max) {
    return { display: text, isTruncated: false };
  }
  return { display: `${text.slice(0, max)}...`, isTruncated: true };
}