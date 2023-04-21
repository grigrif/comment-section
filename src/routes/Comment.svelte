<script>
    import Action from "./Action.svelte";
    import NewComment from "./NewComment.svelte";
    import UpVoteCounter from "./UpVoteCounter.svelte";
    import { comments } from "./store";

    export let user;
    /**
     * @type {{ user: { username: any; image: { png: any; }; }; createdAt: any; replyingTo: any; content: any; score: any; replies: string | any[]; }}
     */
    export let comment;

    let is_op = user.username == comment.user.username;
    let reply_mode = false;
    let edit_mode = false;

    function delete_comment() {
        comments.update((old) => {
            function walk(curr) {
                console.log(curr);
                curr = curr.filter((e) => e.id != comment.id);
                for (let i = 0; i < curr.length; i++) {
                    let el = curr[i];
                    el.replies = walk(el.replies);
                }
                return curr;
            }

            return walk(old);
        });
    }
</script>

<section>
    <div class="left">
        <UpVoteCounter count={comment.score}></UpVoteCounter>
    </div>
    <div class="right">
    <header>
        <div>
            <img src={comment.user.image.png} alt="profile" />
            <h1>{comment.user.username}</h1>

            {#if is_op}
                <h2>you</h2>
            {/if}

            <p>{comment.createdAt}</p>
        </div>
        <div class="colapse">
        <Action
            {is_op}
            on:switch_comment={() => {
                reply_mode = !reply_mode;
            }}
            on:edit={() => {
                edit_mode = true;
            }}
            on:delete={delete_comment}
            commenting={reply_mode}
        /></div>
    </header>
    <p class="content" contenteditable={edit_mode} class:editable={edit_mode}>
        {#if comment.replyingTo}
            <span> @{comment.replyingTo} </span>
        {/if}
        {comment.content}
    </p>
    <div class="update">
        {#if edit_mode}
            <button
                on:click={() => {
                    edit_mode = false;
                }}>UPDATE</button
            >
        {/if}
    </div></div>
    <footer>
        <UpVoteCounter count={comment.score} />
        <Action
            {is_op}
            on:switch_comment={() => {
                reply_mode = !reply_mode;
            }}
            on:edit={() => {
                edit_mode = true;
            }}
            on:delete={delete_comment}
            commenting={reply_mode}
        />
    </footer>
</section>

{#if reply_mode}
    <div class="new-comment">
        <NewComment
            {user}
            from_comment={comment}
            on:new_comment={() => {
                reply_mode = false;
            }}
        />
    </div>
{/if}

{#if comment.replies && comment.replies.length > 0}
    <div class="flex">
        <div class="divider" />
        <div class="replies">
            {#each comment.replies as reply}
                <svelte:self comment={reply} {user} />
            {/each}
        </div>
    </div>
{/if}

<style>
    header div {
        display: flex;
        align-items: center;
    }

    header div * {
        margin: 0;
        line-height: 1rem;
        margin-right: 1rem;
    }

    header h1 {
        font-size: 1em;
        font-weight: 500;
        color: var(--dark-blue);
    }
    header h2 {
        font-size: 0.8em;
        padding: 0.25em 0.5em;
        border-radius: 0.2em;
        font-weight: 200;
        margin-left: -0.5rem;
        color: var(--white);
        background-color: var(--moderate-blue);
    }
    header p {
        font-size: 1em;
        color: var(--grayish-blue);
        font-weight: 400;
    }

    header img {
        width: 2em;
        height: 2em;
    }
    section {
        background: var(--white);
        margin-bottom: var(--medium-padding);
        border-radius: var(--small-padding);
        padding: var(--medium-padding);
    }

    section .content {
        color: var(--grayish-blue);
        line-height: 1.5em;
        margin-top: 1em;
    }
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .flex {
        display: flex;
    }
    .divider {
        width: 2px;
        flex-shrink: 0;
        background: var(--grayish-blue);
        opacity: 0.2;
        margin-bottom: 1rem;
        border-radius: 3px;
        margin-right: var(--medium-padding);
    }

    .replies {
        flex-grow: 1;
    }

    .new-comment {
        margin-bottom: var(--medium-padding);
    }

    p span {
        color: var(--moderate-blue);
        font-weight: 500;
    }

    .editable {
        outline: none;
        border: 1px solid var(--moderate-blue);
        border-radius: var(--small-padding);
        padding: var(--small-padding);
    }
    button {
        color: var(--white);
        padding: 0.5em 1em;
        font-size: 1em;
        border-radius: 0.3rem;
        outline: none;
        border: none;
        background-color: var(--moderate-blue);
    }
    .update {
        display: flex;
        justify-content: flex-end;
        margin-bottom: var(--small-padding);
    }
    @media screen and (min-width: 768px) {
        footer {
            display: none;
        }

        .left, .colapse {
            display: block!important;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        section {
            display: flex;
        }

        .divider {
            margin: 0 var(--large-padding);
            margin-bottom: var(--medium-padding);
        }
    }

    .left, .colapse {
        display: none;
    }
    .right {
        flex-grow: 1;
    }
    .left {
        flex-shrink: 0;
    }
</style>
