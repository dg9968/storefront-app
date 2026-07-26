// @react-native-google-signin/google-signin is a native-only module (no web build) and its
// compiled output isn't safe to bundle for web. Storefront gates real usage behind
// `loginSupported('google')` (requires GOOGLE_CLIENT_ID + GOOGLE_LOGIN_ENABLED), so this stub
// only needs to exist and fail loudly if actually invoked.
export const GoogleSignin = {
    configure() {},
    hasPlayServices() {
        return Promise.resolve(true);
    },
    signIn() {
        return Promise.reject(new Error('Google Sign-In is not supported on web.'));
    },
};

export default GoogleSignin;
