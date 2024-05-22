const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const setCredentials = (tokens) => {
  oauth2Client.setCredentials(tokens);
};

const updateGoogleCalendarEvent = async (eventId, newDate, newTime) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    await calendar.events.patch({
      calendarId: 'primary', 
      eventId: process.env.GOOGLE_CLIENT_ID, 
      resource: {
        start: {
          dateTime: newDate + 'T' + newTime, 
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: newDate + 'T' + newTime, 
          timeZone: 'Asia/Kolkata',
        },
      },
    });
    console.log('Event updated successfully');
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

module.exports = {
  setCredentials,
  updateGoogleCalendarEvent,
};
