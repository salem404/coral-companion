<template>
    <form>
        <div>
            <label for="email">Email </label>
            <input
                type="email"
                placeholder="Enter Email"
                name="email"
                required
            />
        </div>

        <div>
            <label for="psw">Password</label>
            <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
            />
        </div>

        <button type="submit">Submit</button>
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    div {
        display: flex;
        flex-direction: column;

        p {
            margin: 0px;
        }
    }
    label {
        color: var(--color);
        font-family: Quicksand;
        font-size: 36px;
        font-weight: 400;
        line-height: 45px;
        letter-spacing: 0em;
        text-align: left;
    }
    input,
    select {
        font-size: 1rem;
        padding: 5px;
        font-family: Quicksand;
        font-size: 30px;
        font-weight: 400;
        line-height: 38px;
        letter-spacing: 0em;
        text-align: left;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        border-radius: 100px;
        border: none;
    }
    button {
        margin: 10px;
        border: none;
        transition: 120ms;
        cursor: pointer;
        color: var(--black);
        text-decoration: none;
        &:hover {
            box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.108);
            transform: translateY(-2px);
        }
        &:active {
            box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.108);
            transform: translateY(2px);
        }
        font-family: Quicksand;
        font-size: 48px;
        font-weight: 600;
        line-height: 60px;
        letter-spacing: 0em;
        text-align: center;
        background: var(--green);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 35px;
        width: 262px;
        height: 65px;
    }
}
</style>
