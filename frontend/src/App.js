
import React from 'react';
import AppRouter from './AppRouter';
import { IntlProvider } from 'react-intl';
import messages from './config/locales/en';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import AppShell from 'material-ui-shell/App';

const theme = createTheme();

const App = () => (
	<ThemeProvider theme={theme}>
		<IntlProvider locale="en" messages={messages}>
			<AppRouter />
		</IntlProvider>
	</ThemeProvider>
);

export default App;
