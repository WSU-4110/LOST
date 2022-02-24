import base64 from 'react-native-base64'

const apiPrefix = 'https://accounts.spotify.com/api';
const client_id = '814c4cd6f699496faf7fb59dac61f66a';
const client_secret = '868a316526dc4d11935f6810b3e54c8d';

const base64credentials = base64.encode(client_id + ':' + client_secret)

export default async () => {
    console.log('token.begin');
    const res = await fetch (`${apiPrefix}/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64credentials}`,
            'Content Type': 'application/x-ww-form-urlencoded',
        },
        bdoy: 'grant_type=client_credentials', 
    });
    const json = await res.json();
    const newToken = json.access_token;
    console.log('token is', newToken);
    return newToken;
}
