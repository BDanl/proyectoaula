import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../components/TabNavigator";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ExploreScreen from "../screens/Workout/subscreens/ExploreScreen";
import WorkoutScreen from "../screens/Workout/WorkoutScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingScreen from "../screens/Profile/Settings/SettingScreen";
import TermsScreen from "../screens/Profile/Settings/TermsScreen";
import ProfileEditScreen from "../screens/Profile/Settings/ProfileEditScreen";
import ChangePasswordScreen from "../screens/Profile/Settings/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/Profile/Settings/DeleteAccountScreen";
import FullBodyRoutine from "../screens/Workout/subscreens/Subsubscreens/FullBodyRoutine";
import PushPullLegsRoutine from "../screens/Workout/subscreens/Subsubscreens/PushPullLegsRoutine";
import StrengthRoutine from "../screens/Workout/subscreens/Subsubscreens/StrengthRoutine";
import BeginnerRoutine from "../screens/Workout/subscreens/Subsubscreens/BeginnerRoutine";
import HIITRoutine from "../screens/Workout/subscreens/Subsubscreens/HIITRoutine";
import CoreRoutine from "../screens/Workout/subscreens/Subsubscreens/CoreRoutine";
import CalisthenicsRoutine from "../screens/Workout/subscreens/Subsubscreens/CalisthenicsRoutine";
import NewRoutineScreen from "../screens/Workout/subscreens/NewRoutineScreen";
import Session1 from "../screens/Workout/subscreens/Subscreensroutine/Session1";
import Session2 from "../screens/Workout/subscreens/Subscreensroutine/Session2";
import Session3 from "../screens/Workout/subscreens/Subscreensroutine/Session3";
import Session4 from "../screens/Workout/subscreens/Subscreensroutine/Session4";
import StatsScreen from "../screens/Profile/Stats/StatsScreen";
import ExercisesListScreen from "../screens/Profile/Ejercicios/ExercisesListScreen";

const AppStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "black" },
      }}
    >
      <AppStack.Screen name="TabHome" component={TabNavigator} />

      <AppStack.Screen name="LoginScreen" component={LoginScreen} />
      <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />

      <AppStack.Screen name="ExploreScreen" component={ExploreScreen} />
      <AppStack.Screen name="FullBodyRoutine" component={FullBodyRoutine} />
      <AppStack.Screen name="PushPullLegsRoutine" component={PushPullLegsRoutine} />
      <AppStack.Screen name="StrengthRoutine" component={StrengthRoutine} />
      <AppStack.Screen name="BeginnerRoutine" component={BeginnerRoutine} />
      <AppStack.Screen name="HIITRoutine" component={HIITRoutine} />
      <AppStack.Screen name="CoreRoutine" component={CoreRoutine} />
      <AppStack.Screen name="CalisthenicsRoutine" component={CalisthenicsRoutine} />

      <AppStack.Screen name="NewRoutineScreen" component={NewRoutineScreen} />
      <AppStack.Screen name="Session1" component={Session1} />
      <AppStack.Screen name="Session2" component={Session2} />
      <AppStack.Screen name="Session3" component={Session3} />
      <AppStack.Screen name="Session4" component={Session4} />

      <AppStack.Screen name="Stats" component={StatsScreen} />
      <AppStack.Screen name="ExercisesList" component={ExercisesListScreen} />

      <AppStack.Screen name="SettingScreen" component={SettingScreen} />
      <AppStack.Screen name="TermsScreen" component={TermsScreen} />
      <AppStack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <AppStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <AppStack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />


      <AppStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AppStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    </AppStack.Navigator>
  );
}

export default MainStackNavigator;
