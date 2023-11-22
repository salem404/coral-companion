<template>
    <section>
        <h2>Log In</h2>
        <div>
            <form>
                <fieldset>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" />
                </fieldset>
                <fieldset>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </fieldset>
                <button class="btn" type="submit">Submit</button>
            </form>
        </div>
    </section>
</template>
<script>
export default {
    name: "FormLogin",
};
</script>
<style lang="scss" scoped>
section {
    display: flex;
    padding: 0rem 0.0625rem;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
}

div {
    flex-shrink: 0;
    border-radius: var(--radio-L, 2.5rem);
    border: 28px solid var(--borde-borde, #135C7D);
    background: var(--fondo-transparente, rgba(217, 217, 217, 0.82));
    padding: 6.56rem;
}

h2 {
    display: flex;
    width: 25rem;
    height: 7.205rem;
    padding: var(--session-horizontal-padding, 1.1875rem);
    justify-content: center;
    align-items: center;
    border-radius: var(--session-radio, 0.625rem);
    border: 8px solid var(--session-borde, #135C7D);
    background: var(--session-fondo, #0892B6);
    position: relative;
    top: 4rem;
}

form {
    display: inline-flex;
    height: 25.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--espaciado-desktop-100, 1.75rem);
    flex-shrink: 0;
}

fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--fieldset-gap, 0.75rem);

    label {
        display: flex;
        height: 1.625rem;
        flex-direction: column;
        justify-content: center;
        flex: 1 0 0;
        color: var(--text-label, #110300);

        /* PC/Label */
        font-family: Quicksand;
        font-size: 2.1875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    input {
        display: flex;
        width: 25rem;
        padding: var(--input-vertical-padding, 0.75rem) var(--input-horizontal-padding, 1.75rem);
        justify-content: space-between;
        align-items: center;
        border-radius: var(--input-radio, 2.5rem);
        background: var(--input-fondo, #D9D9D9);

        /* sombra */
        box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.25);
        color: var(--text-primary, #110300);
        /* PC/P */
        font-family: Quicksand;
        font-size: 1.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        &::placeholder {
            color: var(--text-placeholder, #135C7D);
        }
    }
}
</style>