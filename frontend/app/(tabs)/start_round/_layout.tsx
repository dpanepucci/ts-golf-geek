import { Stack } from 'expo-router';

export default function StartRoundLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="startRound"
                options={{
                    title: 'Start Round',
                }}
            />
        </Stack>
    );
}