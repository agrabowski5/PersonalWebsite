<script>
    export let data = {};
    export let hLevel = 2;
  </script>

<article>
    <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
    <img src={data.image} alt="" />
    <p>
        {data.description}
    </p>
</article>

<style>
    article {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* Make each article span 3 rows */
  padding: 1em;
  border-radius: 0.25em;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
}
</style>