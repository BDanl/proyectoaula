import { useState, useEffect, useCallback } from 'react';
import { saveWorkoutSession } from '../utils/workoutStorage';

const useWorkoutTimer = (exercisesConfig = []) => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState({});
  const [completedExercisesData, setCompletedExercisesData] = useState({
    muscleGroups: {},
    exerciseTypes: {}
  });
  const [startTime, setStartTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

   const calculateCompletionPercentage = useCallback(() => {
    const totalExercises = exercisesConfig.length;
    if (totalExercises === 0) return 0;
    
    const completedCount = Object.values(completedExercises)
      .filter(isCompleted => isCompleted).length;
      
    return Math.round((completedCount / totalExercises) * 100);
  }, [completedExercises, exercisesConfig]);;

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleWorkoutToggle = useCallback(async () => {
    const nowActive = !isWorkoutActive;
    setIsWorkoutActive(nowActive);
    
    if (nowActive) {
      setElapsedTime(0);
      setCompletedExercises({});
      setStartTime(new Date());
      return { action: 'start' };
    }
    
    setIsSaving(true);
    try {
      const endTime = new Date();
      const workoutData = {
        startTime,
        endTime,
        duration: elapsedTime,
        completedExercises,
        completionPercentage: calculateCompletionPercentage(),
        muscleGroups: completedExercisesData.muscleGroups,
        exerciseTypes: completedExercisesData.exerciseTypes
      };
      
      const saved = await saveWorkoutSession(workoutData);
      return { 
        action: 'stop',
        success: saved,
        workoutData 
      };
    } finally {
      setIsSaving(false);
    }
  }, [
    isWorkoutActive,
    startTime,
    elapsedTime,
    completedExercises,
    calculateCompletionPercentage,
    completedExercisesData
  ]);

  const toggleExerciseComplete = useCallback((exerciseId) => {
    const exercise = exercisesConfig.find(e => e.id === exerciseId);
    if (!exercise) return;

    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));

    setCompletedExercisesData(prev => {
      const newData = { ...prev };
      
      if (exercise.muscleGroup) {
        newData.muscleGroups[exercise.muscleGroup] = 
          (newData.muscleGroups[exercise.muscleGroup] || 0) + 
          (completedExercises[exerciseId] ? -1 : 1);
      }
      
      if (exercise.exerciseType) {
        newData.exerciseTypes[exercise.exerciseType] = 
          (newData.exerciseTypes[exercise.exerciseType] || 0) + 
          (completedExercises[exerciseId] ? -1 : 1);
      }
      
      return newData;
    });
  }, [exercisesConfig, completedExercises]);

  useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  return {
    isWorkoutActive,
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    handleWorkoutToggle,
    completedExercises,
    toggleExerciseComplete,
    isSaving,
    completionPercentage: calculateCompletionPercentage(),
    completedExercisesData
  };
};

export default useWorkoutTimer;