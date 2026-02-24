import React, { useMemo, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Autocomplete
} from '@mui/material'
import { DataGrid, GridPagination, GridToolbar } from 'playbook-components'
import { SearchOutlined, MoreVertOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import dayjs from 'dayjs'
import '../../styles/design-tokens.css'
import { Button, StatusChip, Icon } from '../../components'
import TokenizedDrawerAthleteSelector from '../../components/forms/TokenizedDrawerAthleteSelector'
import CreateFormDrawer from '../../components/forms/CreateFormDrawer'
import athletesData from '../../data/athletes.json'
import formsTemplatesData from '../../data/forms_templates.json'
import { currentUser } from '../../data/layout'

function a11yProps(index) {
  return {
    id: `forms-tab-${index}`,
    'aria-controls': `forms-tabpanel-${index}`
  }
}

function TabPanel({ children, value, index }) {
  if (value !== index) return null
  return (
    <Box
      role="tabpanel"
      id={`forms-tabpanel-${index}`}
      aria-labelledby={`forms-tab-${index}`}
      sx={{ pt: 0, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
    >
      {children}
    </Box>
  )
}

const typographyStyles = {
  fontFamily: 'var(--font-family-primary)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-medium)'
}

const gridSx = {
  flex: 1,
  minHeight: 0,
  width: '100%',
  '& .MuiDataGrid-root': { border: 'none' },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'var(--color-background-primary)',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: 'var(--font-size-sm)',
      fontFamily: 'var(--font-family-primary)'
    }
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid var(--color-border-secondary)',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-family-primary)'
  },
  '& .grid-cell--pad-left': { pl: 3, paddingLeft: '24px !important' },
  '& .grid-cell--pad-right': { pr: 3, paddingRight: '24px !important' },
  '& .MuiDataGrid-footerContainer': { px: 3 }
}

const initialFormsFromData = (formsTemplatesData || []).map((r) => ({
  id: r.id,
  form: r.form,
  productArea: r.productArea,
  category: r.category,
  description: r.description || '',
  owner: r.owner,
  lastUpdated: r.lastUpdated
}))

const completedRowsData = [
  { id: 467635, athleteName: 'Bhuvan Bhatt', formName: 'Test Signature Form', productArea: 'General', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: '31 Jan 2026', formStatus: 'Complete' },
  { id: 467634, athleteName: 'Akanksha', formName: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Benny Gordon-admin-eu', completionDate: '30 Jan 2026', formStatus: 'Complete' },
  { id: 467633, athleteName: 'Benny Gordon', formName: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Benny Gordon-admin-eu', completionDate: '26 Sep 2025', formStatus: 'In progress' },
  { id: 467632, athleteName: 'Marcus Johnson', formName: 'Daily Wellness Check', productArea: 'Performance', category: 'Wellbeing', examiner: 'Performance', completionDate: '24 Feb 2026', formStatus: 'Complete' },
  { id: 467631, athleteName: 'Elena Rodriguez', formName: 'Pre-Season Medical Screening', productArea: 'Medical', category: 'Medical', examiner: 'Dr. Sarah Mitchell', completionDate: '20 Feb 2026', formStatus: 'Not started' },
  { id: 467630, athleteName: 'David Chen', formName: 'Training Load Monitoring', productArea: 'Performance', category: 'Wellbeing', examiner: 'Performance', completionDate: '18 Feb 2026', formStatus: 'In progress' },
  { id: 467629, athleteName: 'James Wilson', formName: 'Scholarship Reviews', productArea: 'Medical', category: 'Other', examiner: 'Saar Byrne-admin-eu', completionDate: '15 Feb 2026', formStatus: 'Complete' },
  { id: 467628, athleteName: 'Emma Brown', formName: 'Consent and Data Release', productArea: 'General', category: 'Other', examiner: 'Sporting Operations', completionDate: '10 Feb 2026', formStatus: 'Not started' },
  { id: 467627, athleteName: 'Liam Davis', formName: 'Post-Game RPE', productArea: 'Performance', category: 'Other', examiner: 'Coaching', completionDate: '8 Feb 2026', formStatus: 'Complete' },
  { id: 467626, athleteName: 'Sophie Miller', formName: 'Concussion Protocol', productArea: 'Medical', category: 'Medical', examiner: 'Medical', completionDate: '5 Feb 2026', formStatus: 'Complete' }
]

const complianceRowsData = [
  { id: 'c-1', athleteName: 'Tymofii Antoniuk', position: 'Hooker', dob: 'Apr 18, 2002', complete: 0, total: 1, lastUpdated: '24 Feb 2026' },
  { id: 'c-2', athleteName: 'Johnny Appleseed', position: 'Loose-head Prop', dob: 'Jan 01, 2000', complete: 0, total: 6, lastUpdated: '—' },
  { id: 'c-3', athleteName: 'Daniel Athlete', position: 'Wing', dob: 'Nov 12, 1980', complete: 0, total: 5, lastUpdated: '18 Jan 2026' },
  { id: 'c-4', athleteName: 'Test Reset PW Confirm', position: 'Inside Centre', dob: 'Jun 28, 2000', complete: 0, total: 4, lastUpdated: '—' },
  { id: 'c-5', athleteName: 'Form PDF Export Test', position: 'Outside Centre', dob: 'Jul 09, 1999', complete: 0, total: 4, lastUpdated: '10 Feb 2026' },
  { id: 'c-6', athleteName: 'Marcus Johnson', position: 'Forward', dob: 'Mar 15, 1999', complete: 3, total: 5, lastUpdated: '22 Feb 2026' },
  { id: 'c-7', athleteName: 'Elena Rodriguez', position: 'Midfielder', dob: 'Aug 22, 1996', complete: 2, total: 6, lastUpdated: '—' },
  { id: 'c-8', athleteName: 'David Chen', position: 'Defender', dob: 'Nov 03, 2000', complete: 1, total: 4, lastUpdated: '15 Feb 2026' },
  { id: 'c-9', athleteName: 'Emma Brown', position: 'Wing', dob: 'Feb 14, 1998', complete: 0, total: 3, lastUpdated: '—' },
  { id: 'c-10', athleteName: 'Liam Davis', position: 'Second Row', dob: 'Jul 28, 1997', complete: 4, total: 4, lastUpdated: '20 Feb 2026' }
]

export default function FormsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location?.state || {}

  const [tabValue, setTabValue] = useState(
    locationState.initialTab === 'compliance' ? 2 : (locationState.initialTab === 'completed' ? 1 : 0)
  )
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 })
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null)
  const [actionRowId, setActionRowId] = useState(null)
  const [assignOpen, setAssignOpen] = useState(false)
  const [selectedAthletes, setSelectedAthletes] = useState([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // Forms list: initial from JSON + newly created (add logic)
  const [formsList, setFormsList] = useState(initialFormsFromData)

  const handleCreateForm = useCallback((payload) => {
    const id = `new-${Date.now()}`
    const lastUpdated = dayjs().format('D MMM YYYY')
    setFormsList((prev) => [
      ...prev,
      {
        id,
        form: payload.title || 'Untitled form',
        productArea: 'General',
        category: payload.category || 'Other',
        description: payload.description || '',
        owner: currentUser?.name || 'Me',
        lastUpdated
      }
    ])
    setIsCreateOpen(false)
  }, [])

  // —— Forms tab ——
  const [searchForm, setSearchForm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const formsRows = useMemo(() => {
    let rows = formsList.map((r) => ({
      ...r,
      description: r.description || '—'
    }))
    if (searchForm) {
      const q = searchForm.toLowerCase()
      rows = rows.filter((r) => (r.form || '').toLowerCase().includes(q))
    }
    if (categoryFilter) {
      rows = rows.filter((r) => (r.category || '').toLowerCase() === categoryFilter.toLowerCase())
    }
    return rows
  }, [formsList, searchForm, categoryFilter])

  const formsColumns = useMemo(() => [
    {
      field: 'form',
      headerName: 'Form',
      flex: 1,
      minWidth: 200,
      headerClassName: 'grid-cell--pad-left',
      cellClassName: 'grid-cell--pad-left',
      renderCell: (params) => (
        <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' }}>
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/${params.row.id}/build`)
            }}
            sx={{ color: 'var(--color-primary)', '&:hover': { color: 'var(--color-primary-hover)' } }}
          >
            {params.value}
          </Link>
        </Typography>
      )
    },
    { field: 'productArea', headerName: 'Product area', width: 140 },
    { field: 'category', headerName: 'Category', width: 120 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' }} title={params.value}>
          {params.value || '—'}
        </Typography>
      )
    },
    { field: 'owner', headerName: 'Owner', width: 180 },
    { field: 'lastUpdated', headerName: 'Last updated', width: 140, headerClassName: 'grid-cell--pad-right', cellClassName: 'grid-cell--pad-right' },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 56,
      align: 'right',
      headerAlign: 'right',
      headerClassName: 'grid-cell--pad-right',
      cellClassName: 'grid-cell--pad-right',
      renderCell: (params) => (
        <IconButton
          size="small"
          aria-label="more"
          onClick={(e) => {
            e.stopPropagation()
            setActionMenuAnchor(e.currentTarget)
            setActionRowId(params.row.id)
          }}
          sx={{ color: 'var(--color-text-secondary)' }}
        >
          <MoreVertOutlined fontSize="small" />
        </IconButton>
      )
    }
  ], [navigate])

  const drawerAthletes = useMemo(
    () =>
      (athletesData || []).map((a) => ({
        id: String(a.id ?? `${a.firstname}-${a.lastname}`),
        name: `${a.firstname} ${a.lastname}`.trim(),
        position: a.position || a.position_group || '—',
        ageGroup: (a.squad_name && /U\d+/.test(a.squad_name)) ? (a.squad_name.match(/U\d+/)?.[0] || 'U21') : 'U21',
        status: a.availability_status === 'Injured' ? 'injured' : 'available',
        avatar: undefined
      })),
    []
  )

  // —— Completed tab ——
  const [completedAthlete, setCompletedAthlete] = useState(null)
  const [completedFormName, setCompletedFormName] = useState(null)
  const [completedStatus, setCompletedStatus] = useState(null)
  const [completedDateRange, setCompletedDateRange] = useState([null, null])

  const completedFilteredRows = useMemo(() => {
    let rows = completedRowsData
    if (completedAthlete) rows = rows.filter((r) => r.athleteName === completedAthlete)
    if (completedFormName) rows = rows.filter((r) => (r.formName || '').toLowerCase().includes(String(completedFormName).toLowerCase()))
    if (completedStatus) rows = rows.filter((r) => r.formStatus === completedStatus)
    const [start, end] = completedDateRange || [null, null]
    if (start) rows = rows.filter((r) => dayjs(r.completionDate).isAfter(dayjs(start).startOf('day')) || dayjs(r.completionDate).isSame(dayjs(start).startOf('day')))
    if (end) rows = rows.filter((r) => dayjs(r.completionDate).isBefore(dayjs(end).endOf('day')) || dayjs(r.completionDate).isSame(dayjs(end).endOf('day')))
    return rows
  }, [completedAthlete, completedFormName, completedStatus, completedDateRange])

  const completedColumns = useMemo(
    () => [
      {
        field: 'athleteName',
        headerName: 'Athlete',
        minWidth: 180,
        flex: 1,
        headerClassName: 'grid-cell--pad-left',
        cellClassName: 'grid-cell--pad-left',
        renderCell: (params) => (
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/form_answers_sets/${params.row.id}`, { state: { athleteName: params.row.athleteName } })
            }}
            sx={{ color: 'var(--color-primary)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)', '&:hover': { color: 'var(--color-primary-hover)' } }}
          >
            {params.value}
          </Link>
        )
      },
      {
        field: 'formName',
        headerName: 'Form name',
        minWidth: 200,
        renderCell: (params) => (
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/form_answers_sets/${params.row.id}`, { state: { athleteName: params.row.athleteName } })
            }}
            sx={{ color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)', '&:hover': { color: 'var(--color-primary-hover)' } }}
          >
            {params.value}
          </Link>
        )
      },
      { field: 'productArea', headerName: 'Product area', minWidth: 120 },
      { field: 'category', headerName: 'Category', minWidth: 100 },
      { field: 'examiner', headerName: 'Examiner', minWidth: 160 },
      { field: 'completionDate', headerName: 'Completion date', minWidth: 140 },
      {
        field: 'formStatus',
        headerName: 'Form status',
        minWidth: 120,
        renderCell: (params) => {
          const status = params.value
          const type = status === 'Complete' ? 'success' : status === 'In progress' ? 'warning' : 'error'
          return <StatusChip status={status} type={type} />
        }
      },
      {
        field: 'delete',
        headerName: '',
        sortable: false,
        width: 56,
        align: 'right',
        headerClassName: 'grid-cell--pad-right',
        cellClassName: 'grid-cell--pad-right',
        renderCell: (params) => (
          <IconButton
            size="small"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation()
            }}
            sx={{ color: 'var(--color-text-secondary)' }}
          >
            <Icon icon="delete" size="medium" />
          </IconButton>
        )
      }
    ],
    [navigate]
  )

  // —— Compliance tab ——
  const [complianceAthlete, setComplianceAthlete] = useState(null)
  const [complianceFormName, setComplianceFormName] = useState(null)
  const [complianceSquad, setComplianceSquad] = useState(null)
  const [complianceDateRange, setComplianceDateRange] = useState([null, null])

  const complianceFilteredRows = useMemo(() => {
    let rows = complianceRowsData
    if (complianceAthlete) rows = rows.filter((r) => r.athleteName === complianceAthlete)
    if (complianceFormName) rows = rows.filter((r) => (r.athleteName || '').toLowerCase().includes(String(complianceFormName).toLowerCase()))
    if (complianceSquad) rows = rows.filter((r) => (r.position || '').toLowerCase().includes(String(complianceSquad).toLowerCase()))
    const [start, end] = complianceDateRange || [null, null]
    if (start || end) {
      // Filter by date if we had a date field on compliance rows; for now no date filter on compliance
    }
    return rows
  }, [complianceAthlete, complianceFormName, complianceSquad, complianceDateRange])

  const complianceColumns = useMemo(
    () => [
      {
        field: 'athleteName',
        headerName: 'Athlete',
        flex: 1,
        minWidth: 260,
        headerClassName: 'grid-cell--pad-left',
        cellClassName: 'grid-cell--pad-left',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' }}>
              {params.row.athleteName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' }}>
              {params.row.position}
              {params.row.dob ? ` · ${params.row.dob}` : ''}
            </Typography>
          </Box>
        )
      },
      { field: 'lastUpdated', headerName: 'Last updated', minWidth: 160, renderCell: (params) => (params.row.lastUpdated ?? '—') },
      {
        field: 'status',
        headerName: 'Status',
        minWidth: 100,
        headerClassName: 'grid-cell--pad-right',
        cellClassName: 'grid-cell--pad-right',
        renderCell: (params) => (
          <StatusChip status={`${params.row.complete}/${params.row.total}`} type={params.row.complete === params.row.total ? 'success' : 'error'} />
        )
      }
    ],
    []
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, bgcolor: 'var(--color-background-primary)', height: '100%', fontFamily: 'var(--font-family-primary)' }}>
        {/* Page title (big) + Create form button */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2, pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-2xl)' }}>
            Forms
          </Typography>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setIsCreateOpen(true)}
            style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}
          >
            Create form
          </Button>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            aria-label="Forms tabs"
            sx={{
              px: 3,
              pt: 1,
              minHeight: 44,
              borderBottom: '1px solid var(--color-border-primary)',
              '& .MuiTab-root': {
                minHeight: 44,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-family-primary)',
                color: 'var(--color-text-muted)'
              },
              '& .MuiTab-root.Mui-selected': { color: 'var(--color-primary)' },
              '& .MuiTabs-indicator': { backgroundColor: 'var(--color-primary)' }
            }}
          >
            <Tab label="Forms" {...a11yProps(0)} />
            <Tab label="Completed" {...a11yProps(1)} />
            <Tab label="Compliance" {...a11yProps(2)} />
          </Tabs>

          {/* Forms tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flexShrink: 0 }}>
              <TextField
                size="small"
                variant="filled"
                placeholder="Search"
                value={searchForm}
                onChange={(e) => setSearchForm(e.target.value)}
                sx={{ minWidth: 260, ...typographyStyles }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlined fontSize="small" sx={{ color: 'var(--color-primary)' }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                select
                size="small"
                variant="filled"
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{ minWidth: 220 }}
                InputProps={{ sx: typographyStyles }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Wellbeing">Wellbeing</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
              </TextField>
            </Box>
            <Box sx={gridSx}>
              <DataGrid
                rows={formsRows}
                columns={formsColumns}
                disableRowSelectionOnClick
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[25, 50, 100]}
                slots={{ pagination: GridPagination }}
                slotProps={{ pagination: { showFirstButton: true, showLastButton: true } }}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
              />
            </Box>
          </TabPanel>

          {/* Completed tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flexShrink: 0 }}>
              <Autocomplete
                size="small"
                options={[...new Set(completedRowsData.map((r) => r.athleteName))]}
                value={completedAthlete}
                onChange={(_, v) => setCompletedAthlete(v)}
                popupIcon={<ArrowDropDownOutlined fontSize="small" sx={{ color: 'var(--color-primary)' }} />}
                renderInput={(params) => <TextField {...params} label="Athletes" variant="filled" />}
                sx={{ minWidth: 200 }}
              />
              <TextField
                size="small"
                variant="filled"
                label="Form"
                placeholder="Form"
                value={completedFormName || ''}
                onChange={(e) => setCompletedFormName(e.target.value)}
                sx={{ minWidth: 180 }}
              />
              <TextField
                select
                size="small"
                variant="filled"
                label="Status"
                value={completedStatus || ''}
                onChange={(e) => setCompletedStatus(e.target.value)}
                sx={{ minWidth: 140 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Complete">Complete</MenuItem>
                <MenuItem value="In progress">In progress</MenuItem>
                <MenuItem value="Not started">Not started</MenuItem>
              </TextField>
              <TextField select size="small" variant="filled" label="Category" sx={{ minWidth: 140 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <DateRangePicker
                value={completedDateRange}
                onChange={(newValue) => setCompletedDateRange(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'filled',
                    sx: { minWidth: 260 },
                    inputProps: { placeholder: 'Start – End' }
                  }
                }}
                sx={{
                  '& .MuiInputBase-root': { fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' },
                  '& .MuiIconButton-root': { color: 'var(--color-primary)' }
                }}
              />
            </Box>
            <Box sx={gridSx}>
              <DataGrid
                rows={completedFilteredRows}
                columns={completedColumns}
                disableRowSelectionOnClick
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[25, 50, 100]}
                slots={{ pagination: GridPagination }}
                slotProps={{ pagination: { showFirstButton: true, showLastButton: true } }}
              />
            </Box>
          </TabPanel>

          {/* Compliance tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flexShrink: 0 }}>
              <Autocomplete
                size="small"
                options={complianceRowsData.map((r) => r.athleteName)}
                value={complianceAthlete}
                onChange={(_, v) => setComplianceAthlete(v)}
                popupIcon={<ArrowDropDownOutlined fontSize="small" sx={{ color: 'var(--color-primary)' }} />}
                renderInput={(params) => <TextField {...params} label="Athletes" variant="filled" />}
                sx={{ minWidth: 200 }}
              />
              <TextField
                size="small"
                variant="filled"
                label="Form"
                value={complianceFormName || ''}
                onChange={(e) => setComplianceFormName(e.target.value)}
                sx={{ minWidth: 180 }}
              />
              <TextField
                select
                size="small"
                variant="filled"
                label="Squad"
                value={complianceSquad || ''}
                onChange={(e) => setComplianceSquad(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="">All</MenuItem>
              </TextField>
              <DateRangePicker
                value={complianceDateRange}
                onChange={(newValue) => setComplianceDateRange(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'filled',
                    sx: { minWidth: 260 },
                    inputProps: { placeholder: 'Start – End' }
                  }
                }}
                sx={{
                  '& .MuiInputBase-root': { fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' },
                  '& .MuiIconButton-root': { color: 'var(--color-primary)' }
                }}
              />
            </Box>
            <Box sx={gridSx}>
              <DataGrid
                rows={complianceFilteredRows}
                columns={complianceColumns}
                disableRowSelectionOnClick
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[25, 50, 100]}
                slots={{ pagination: GridPagination, toolbar: GridToolbar }}
                slotProps={{ pagination: { showFirstButton: true, showLastButton: true } }}
              />
            </Box>
          </TabPanel>
        </Paper>

        <Menu
          anchorEl={actionMenuAnchor}
          open={Boolean(actionMenuAnchor)}
          onClose={() => {
            setActionMenuAnchor(null)
            setActionRowId(null)
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              '& .MuiMenuItem-root': { fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-sm)' }
            }
          }}
        >
          <MenuItem
            onClick={() => {
              setActionMenuAnchor(null)
              if (actionRowId) navigate(`/forms/${actionRowId}/build`)
              setActionRowId(null)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActionMenuAnchor(null)
              setAssignOpen(true)
              setActionRowId(null)
            }}
          >
            Assign
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActionMenuAnchor(null)
              setActionRowId(null)
            }}
          >
            Delete
          </MenuItem>
        </Menu>

        <TokenizedDrawerAthleteSelector
          open={assignOpen}
          onClose={() => setAssignOpen(false)}
          athletes={drawerAthletes}
          selectedAthletes={selectedAthletes}
          onSelectionChange={setSelectedAthletes}
        />

        <CreateFormDrawer
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateForm}
          categories={['Medical', 'Performance', 'Wellbeing', 'Other']}
        />
      </Box>
    </LocalizationProvider>
  )
}
