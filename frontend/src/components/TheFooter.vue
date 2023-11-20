<template>
    <footer>
        <a
            href="https://github.com/salem404/coral-companion"
            alt="GitHub Repository"
        >
            <picture className="btn-UIgithub">
                <!--TODO: Add png image fallback-->
                <img src="@/assets/img/GitHubIcon.svg" alt="Github" />
            </picture>
        </a>
        <button className="btn-UIlogOut"></button>
    </footer>
</template>
<script>
export default {
    name: "TheFooter",
};
</script>
