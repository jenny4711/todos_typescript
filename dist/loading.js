"use strict";
{
}
printLoginState({ state: 'loading' }); // 👀 loading...
printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
