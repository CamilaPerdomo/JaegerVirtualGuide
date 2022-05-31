/**
 * Código base para el archivo Index.js
 */

import { AppRegistry } from 'react-native';
import AppRoute from './src/route/AppRoute';
import { name as appName } from './app.json';

// Se crea y se registra el componente AppRoute
AppRegistry.registerComponent(appName, () => AppRoute);
