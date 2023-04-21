<script>
    /**
     * @type {number}
     */
    export let count;

    const Status = {
        Not: 0,
        Minus: 1,
        Plus: 2,
    };

    let current_status = Status.Not;

    function minus() {
        if (current_status != Status.Minus) {
            if (current_status == Status.Plus) {
                count -= 1;
            }
            count -= 1;
            current_status = Status.Minus;
        } else {
            count += 1;

            current_status = Status.Not;
        }
    }

    function plus() {
        if (current_status != Status.Plus) {
            if (current_status == Status.Minus) {
                count += 1;
            }
            count += 1;
            current_status = Status.Plus;
        } else {
            count -= 1;

            current_status = Status.Not;
        }
    }
</script>

<div>
    <button on:click={plus} class:selected={current_status == Status.Plus}>
        <img src="./images/icon-plus.svg" alt="plus" /></button
    >

    <p>{count}</p>
    <button on:click={minus} class="minus" class:selected={current_status == Status.Minus}
        ><img src="./images/icon-minus.svg" alt="icon-minus" /></button
    >
</div>

<style>
    div {
        display: flex;
        padding: var(--small-padding);
        background-color: var(--very-light-gray);
        border-radius: 0.4em;
    }

    p {
        margin: 0;
        width: 2ch;
        text-align: center;
        color: var(--moderate-blue);
        font-weight: 500;
    }

    button {
        background: transparent;
        border: 0;
        transition: all 300ms;
    }

    .selected {
        filter: saturate(20);
        opacity: 1;
    }
    .minus {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button:hover {
        filter: saturate(20);
        opacity: 1;
    }
    @media screen and (min-width: 768px) {
        div {
            display: flex;
            flex-direction: column;
            margin-right: var(--medium-padding);
        }
        button {
            width: 2em;
            height: 2em;
        }
        p {
            margin: var(--small-padding) 0em;
        }
    }
</style>
