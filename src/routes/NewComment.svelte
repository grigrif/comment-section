<script>
    import { comments, current_id } from "./store";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function get_by_id(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i]
            if (el.id == id) {
                return el
            }
            if (el.replies) {
                let r = get_by_id(el.replies , id)
                if (r) {
                    return r;
                }
            }
        }
        return null;
    }

    function submit() {
        if (content == "") {
            return;
        }

        let comment = {
                id: $current_id,
                content,
                createdAt: "now",
                score: 0,
                user,
                replies: [],
            }
        comments.update((old) => {
            if (!from_comment) {
                old.push(comment);
            } else {
                comment.replyingTo = from_comment.user.username;
                get_by_id(old, from_comment.id).replies.push(comment);
            }
           
            return old;
        });
        dispatch('new_comment')
        content = "";
        current_id.set($current_id + 1);

    }

    let content = "";

    /**
     * @type {{ user: { username: any; }; id: any; }}
     */
     export let from_comment;
    /**
     * @type {{ image: { webp: any; }; }}
     */
     export let user;
</script>

<section >
    <form>
        <img src={user.image.webp} alt="profile" class="colapse" />

    <textarea name="comment" placeholder="Add a comment..." bind:value={content} />
    <button on:click={submit} class="colapse">SEND</button>

    <footer>
        <img src={user.image.webp} alt="profile"  />
        <button on:click={submit}>SEND</button>
    </footer></form>
</section>

<style>
    textarea {
        resize: none;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--light-gray);
        border-radius: var(--small-padding);
        height: 8ch;
        font-size: 1.0em;
        padding: 0.5em 1em;
        color: var(--grayish-blue);
    }
    textarea:focus {
        border: 1px solid var(--moderate-blue);
        outline: none;
    }
    section {
        width: 100%;
        padding: var(--medium-padding);
        background-color: var(--white);
        box-sizing: border-box;
        border-radius: var(--small-padding);
    }
    img {
        width: 2em;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--medium-padding);
    }

    button {
        padding: 1em 2em;
        color: var(--white);
        border: none;
        letter-spacing: 1px;
        background-color: var(--moderate-blue);
        border-radius: 0.3em;
        font-size: 0.7em;
    }
    .colapse {
        display: none;
    }

    @media screen and (min-width: 768px) {
    section form {
        display: flex;
        align-items: flex-start;
    }
    footer {
        display: none;
    }
    textarea {
        margin: 0em var(--medium-padding);
    }
    .colapse {
        display: block;
    }
}
</style>
