import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/Layouts/Header';
import Menu from '@/components/Layouts/Menu';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));




const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


type LayoutProp = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProp) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} onDrawerOpen={() => setOpen(true)} />
            <Menu open={open} onDrawerClose={() => setOpen(false)} />
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}