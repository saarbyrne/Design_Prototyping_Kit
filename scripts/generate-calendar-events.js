/**
 * Generates calendar events for every week of 2025, 2026, and 2027.
 * Run: node scripts/generate-calendar-events.js
 * Reads src/data/calendar_events.json, appends new events, writes back.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../src/data/calendar_events.json');

const TITLES = [
  'KL - With Attach',
  'KL',
  'Squad session',
  'Team training',
  'Recovery session',
  'Repeated event',
  'Individual session',
  'Match prep',
  'Strength & conditioning',
  'Tactical session',
  'Friendly match',
  'Kitman Series',
];

const TYPE_TEMPLATES = [
  {
    eventType: 'TRAINING_SESSION',
    typeCategory: 'Squad Sessions',
    sessionType: ['Agility', 'Workout', 'Club Training', 'Catapult', 'Speed', 'Rehab', 'Omegawave', 'Player Maker', 'Academy Rugby'],
    squad: ['International Squad', '1st team', 'Academy Squad'],
    location: ['Home', 'Away', 'Training Field', 'Main Facility'],
    colors: ['#E62020', '#482831', '#29AE61', '#036BC6'],
  },
  {
    eventType: 'TEST_SESSION',
    typeCategory: 'Individual Sessions',
    sessionType: ['Rehab', 'Catapult', 'Speed'],
    squad: ['International Squad', 'Academy Squad'],
    location: ['Home', 'Testing Facility', 'Training Field'],
    colors: ['#01205D', '#036BC6', '#9b58b5'],
  },
  {
    eventType: 'RECURRING_EVENT',
    typeCategory: 'Events',
    sessionType: [],
    squad: ['International Squad', '1st team'],
    location: ['Home', 'Main Facility', 'Neutral'],
    colors: ['#482831'],
  },
  {
    eventType: 'SERIES_EVENT',
    typeCategory: 'Games',
    sessionType: [],
    squad: ['International Squad', '1st team', 'Academy Squad'],
    location: ['Home', 'Away', 'Neutral'],
    opposition: ['Dublin', 'Cork', 'Galway', 'Australia', 'New Zealand', 'Samoa'],
    colors: ['#B134C1', '#C0392B'],
  },
];

function getWeekStarts(year) {
  const starts = [];
  const d = new Date(year, 0, 1);
  const firstDay = d.getDay();
  const firstMonday = firstDay === 0 ? -6 : 1 - firstDay;
  d.setDate(firstMonday);
  while (d.getFullYear() <= year) {
    if (d.getFullYear() === year) starts.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return starts;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addDays(d, days) {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function toISO(d) {
  return d.toISOString().slice(0, 19);
}

let idCounter = 9000000;

function createEvent(weekStart, templateIndex, dayOffset, hourStart, durationMins) {
  const t = TYPE_TEMPLATES[templateIndex];
  const start = addDays(weekStart, dayOffset);
  start.setHours(hourStart, 0, 0, 0);
  const end = addDays(weekStart, dayOffset);
  end.setHours(hourStart, durationMins, 0, 0);

  const sessionType = t.sessionType && t.sessionType.length ? pick(t.sessionType) : undefined;
  const squad = pick(t.squad);
  const location = pick(t.location);
  const color = pick(t.colors);
  const title = templateIndex === 3 ? `vs ${pick(t.opposition)} - Kitman Series` : pick(TITLES);

  const extendedProps = {
    eventType: t.eventType,
    typeCategory: t.typeCategory,
    squad,
    location,
    coach: 'Kitman Labs',
  };
  if (sessionType) extendedProps.sessionType = sessionType;
  if (templateIndex === 3) {
    extendedProps.competition = 'Kitman Series';
    extendedProps.opposition = pick(t.opposition);
  }
  if (Math.random() > 0.5) extendedProps.attendeeIds = [1, 2, 3];
  if (Math.random() > 0.6) extendedProps.staffIds = [1, 2];

  return {
    id: String(++idCounter),
    title,
    start: toISO(start),
    end: toISO(end),
    backgroundColor: color,
    borderColor: color,
    textColor: '#ffffff',
    url: `/planning_hub/events/${idCounter}`,
    extendedProps,
  };
}

function main() {
  const existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  const years = [2025, 2026, 2027];
  const newEvents = [];

  years.forEach((year) => {
    const weekStarts = getWeekStarts(year);
    weekStarts.forEach((weekStart) => {
      const eventsPerWeek = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < eventsPerWeek; i++) {
        const templateIndex = Math.floor(Math.random() * TYPE_TEMPLATES.length);
        const dayOffset = Math.floor(Math.random() * 5);
        const hourStart = 8 + Math.floor(Math.random() * 10);
        const durationMins = [45, 60, 90, 120][Math.floor(Math.random() * 4)];
        newEvents.push(createEvent(weekStart, templateIndex, dayOffset, hourStart, durationMins));
      }
    });
  });

  const all = [...existing, ...newEvents];
  fs.writeFileSync(DATA_PATH, JSON.stringify(all, null, 2));
  console.log(`Added ${newEvents.length} events. Total: ${all.length}`);
}

main();
