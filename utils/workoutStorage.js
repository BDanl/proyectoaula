import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUT_SESSIONS_KEY = '@workout_sessions';

export const getWorkoutSessions = async () => {
  try {
    const sessions = await AsyncStorage.getItem(WORKOUT_SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error('Error getting workout sessions:', error);
    return [];
  }
};

export const saveWorkoutSession = async (session) => {
  try {
    const existingSessions = await getWorkoutSessions();

    if (!session || !session.startTime) {
      throw new Error('Invalid session data');
    }

    const sessionToSave = {
      ...session,
      date: new Date(session.startTime).toISOString().split('T')[0],
      dayOfWeek: new Date(session.startTime).getDay(),
      month: new Date(session.startTime).getMonth(),
      muscleGroups: session.muscleGroups || {},
      exerciseTypes: session.exerciseTypes || {}
    };

    const updatedSessions = [...existingSessions, sessionToSave];
    await AsyncStorage.setItem(WORKOUT_SESSIONS_KEY, JSON.stringify(updatedSessions));
    return true;
  } catch (error) {
    console.error('Error saving workout session:', error);
    return false;
  }
};

export const getSessionsByDay = async () => {
  try {
    const sessions = await getWorkoutSessions();
    const days = Array(7).fill(0);
    
    sessions.forEach(session => {
      if (session.dayOfWeek !== undefined) {
        days[session.dayOfWeek]++;
      }
    });
    
    return [...days.slice(1), days[0]];
  } catch (error) {
    console.error('Error getting sessions by day:', error);
    return Array(7).fill(0);
  }
};

export const getSessionsByMonth = async () => {
  try {
    const sessions = await getWorkoutSessions();
    const months = Array(12).fill(0);
    
    sessions.forEach(session => {
      if (session.month !== undefined) {
        months[session.month]++;
      }
    });
    
    return months;
  } catch (error) {
    console.error('Error getting sessions by month:', error);
    return Array(12).fill(0);
  };
};