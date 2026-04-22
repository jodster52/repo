import { test, expect } from '@playwright/test';


test('API DELETE Request', async ({ request }) => {

    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)


})


test('API PUT Request', async ({ request }) => {

    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "morpheus",
            "job": "zion leader"
        }
    })

    expect(response.status()).toBe(200)

    const text = await response.text();

    expect(text).toContain('morpheus');

    console.log(await response.json());
})


test('API POST Request', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "morpheus",
            "job": "leader"
        }
    })

    expect(response.status()).toBe(201)

    const text = await response.text();

    expect(text).toContain('morpheus');

    console.log(await response.json());
})

test('API GET Request', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users/2')

    expect(response.status()).toBe(200)

    const text = await response.text();
    const respBody = JSON.parse(await response.text())

    expect(text).toContain('janet');
    expect(respBody.data.id).toBe(2);

    console.log(await response.json());

    const janetEmail = respBody.data.email;

    console.log("Janet's email: ", janetEmail);

    expect(janetEmail).toBe('janet.weaver@reqres.in');
})

test('API GET List Request', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users?page=2')

    expect(response.status()).toBe(200)

    const respBody = JSON.parse(await response.text())

    expect(respBody.page).toBe(2);

    expect(respBody.total).toBe(12);

    
})

