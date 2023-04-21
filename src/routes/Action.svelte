<script>
    /**
     * @type {any}
     */
    export let is_op;

    import { createEventDispatcher } from "svelte";
    import { comments } from "./store";
    export let commenting = false;
    let modal = false;
    const dispatch = createEventDispatcher();

    function teleport(node, name = "teleport") {
        let teleportContainer = document.getElementById(name);
        teleportContainer?.appendChild(node);
        teleportContainer?.classList.add('obstruct')
        return {
            destroy: () => {
                teleportContainer?.classList.remove('obstruct')

            }
        }
    }

    function close() {
        modal = false;
    }

    function delete_comment() {
        close()

        dispatch('delete')
    }
</script>

<section>
    {#if is_op}
        <button
            class="delete"
            on:click={() => {
                modal = true;
            }}
        >
            Delete</button
        >
        <button
            class="edit"
            on:click={() => {
                dispatch("edit");
            }}
        >
            Edit</button
        >
    {:else}
        <button
            class="reply"
            class:replying={commenting}
            on:click={() => {
                dispatch("switch_comment");
            }}>Reply</button
        >
    {/if}
</section>

{#if modal}
    <section use:teleport class="modal">
        <h1>Delete comment</h1>
        <p>Are you sure you want to delete this comment? This will remove the comments and can't be undone.</p>
        <footer>
            <button on:click={close}>NO, CANCEL</button>
            <button on:click={delete_comment}>YES, DELETE</button>
        </footer>
    </section>
{/if}

<style>
    button {
        color: var(--moderate-blue);
        background-color: transparent;
        border: 0;
        font-size: 0.9em;
        font-weight: 500;
    }
    .reply {
        background: url("./images/icon-reply.svg") no-repeat;
        background-position: 0em 0.4em;
        padding-left: 1.2em;
    }

    .delete {
        background: url("./images/icon-delete.svg") no-repeat;
        background-position: 0 0.3em;
        padding-left: 1.2em;
        color: var(--soft-red);
    }
    .edit {
        background: url("./images/icon-edit.svg") no-repeat;
        background-position:0 0.3em;
        padding-left: 1.2em;
        margin-left: 1em;
    }

    .replying {
        opacity: 0.2;
    }
    .modal {
        margin: var(--medium-padding);
        padding: 1.5em;
        max-width: 20rem;
        background-color: white;
        border-radius: var(--small-padding);
    }

    .modal h1 {
        margin: 0;
        font-size: 1.2em;
        color: var(--dark-blue);
    }
    .modal p {
        line-height: 1.5em;
        color: var(--grayish-blue);
    }

    .modal button {
        color: var(--white);
        border-radius: 0.4em;
        flex-grow: 1;
        padding: 0.75em 0em;
        font-weight: 400;
        font-size: 1em;
    }
    .modal button:nth-child(1) {
        background-color: var(--grayish-blue);
        margin-right: var(--medium-padding);
    }
    .modal button:nth-child(2) {
        background-color: var(--soft-red);
    }
    .modal footer {
        display: flex;
        margin-top: 0.5em;

    }

    @media screen and (min-width: 768px) {
        button {
            background-position: 0px 0.5em;
        }
    }
</style>
