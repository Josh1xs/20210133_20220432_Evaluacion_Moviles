# Evaluación Móviles - Firebase

## Estudiante

Nombre completo: REEMPLAZAR_CON_NOMBRE_COMPLETO

Carnet: REEMPLAZAR_CON_CARNET

## Descripción

Aplicación móvil desarrollada con React Native y Expo. Permite registrar usuarios con Firebase Authentication, almacenar y actualizar la información del perfil en Cloud Firestore, iniciar y cerrar sesión y mantener la sesión del usuario en el dispositivo.

## Pantallas

- Inicio de sesión
- Registro
- Dashboard / Perfil

## Datos almacenados

- Nombre completo
- Fecha de nacimiento
- Carnet institucional
- URL de imagen
- Correo electrónico

## Componentes reutilizables

- AppInput
- AppButton
- ProfileImage

## Dependencias principales

- Expo
- React Native
- Firebase
- React Navigation
- AsyncStorage
- react-native-dotenv

## Paleta de colores

- Blanco: #FFFFFF
- Azul: #1D5FD1
- Negro: #111111
- Gris claro: #F2F2F2
- Gris: #666666

## Variables de entorno

El proyecto utiliza un archivo `.env` para las credenciales de Firebase. El archivo `.env.example` contiene la estructura requerida. El archivo `.env` está ignorado por Git.

## Ejecución

```bash
npm install
npx expo start -c
```

Con un emulador Android abierto, presionar `a` o ejecutar:

```bash
npm run android
```

## Firebase

En Firebase Authentication debe estar habilitado el proveedor Correo electrónico/contraseña.

Cloud Firestore debe estar creado y las reglas del archivo `firestore.rules` deben publicarse en Firebase Console.
