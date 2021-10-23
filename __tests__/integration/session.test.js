// describe('authentication', () => {
//     it('should receive JWT token when succesfull authenticated', () =>{

//     });
// });

const {User} = require('../../src/app/models');

describe('authentication', () => {
    it('should sum A+B', async () => {
        const user = await User.create({ name: "Felipe2",email: "abcde@b.c",password_hash: '1212345345'})
        
        console.log(user);

        expect(user.email).toBe('abcde@b.c')
    });
});





