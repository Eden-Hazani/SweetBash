export const upToBottom = (current: any, layouts: any) => {
    return {
        cardStyle: {
            transform: [
                {
                    translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-layouts.screen.height, 1],
                    }),
                },
            ],
        }
    }
}

export const rightToLeft = (current: any, layouts: any) => {
    return {
        cardStyle: {
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 1],
                    }),
                },
            ],
        }
    }
}