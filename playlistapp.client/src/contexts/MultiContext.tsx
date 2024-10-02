import React from 'react'
import { GameContext } from './GameContext';
import { UserGameContext } from './UserGameContext';
import { withContextProvider } from 'react-with-multiple-contexts';

const Component = (props: any) => (
    <React.Fragment>{props.children}</React.Fragment>
)

export const MultiContextProvider = withContextProvider(Component, (props) => ([
    { context: GameContext, value: props.gameContextValue },
    { context: UserGameContext, value: props.userGameContextValue },
]));

<MultiContextProvider gameContextValue={GameContext} userGameContextValue={UserGameContext} />