<template>
    <div>
        <h4>Register</h4>
        <form>
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="name" required autofocus>
            </div>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>

            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="passwordConfirmation" required>
            </div>

            <label for="password-confirm">Is this an administrator account?</label>
            <div>
                <select v-model="isAdmin">
                    <option value=1>Yes</option>
                    <option value=0>No</option>
                </select>
            </div>

            <div>
                <button type="submit" @click="handleSubmit">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
                name : "",
                email : "",
                password : "",
                passwordConfirmation : "",
                isAdmin : null
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.passwordConfirmation && this.password.length > 0)
                {
                    let url = "http://localhost:3000/register"
                    if(this.isAdmin != null || this.isAdmin == 1) url = "http://localhost:3000/register-admin"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        isAdmin: this.isAdmin
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                } else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>