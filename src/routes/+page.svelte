<script>
    import Comment from "./Comment.svelte";
    import NewComment from "./NewComment.svelte";
    import data from "./data.json";
    import { comments } from "./store";
</script>

{#each $comments as comment}
    <Comment {comment} user={data.currentUser} />
{/each}
<NewComment user={data.currentUser} from_comment={null} />
