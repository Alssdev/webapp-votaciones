<template>
  <div>
    <h1 class="title">Lista de departamentos</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
      <b-table-column label="Nombre" field="nombre" v-slot="props" sortable searchable>
        {{ props.row.nombre }}
      </b-table-column>
      <b-table-column label="Editar" v-slot="props" width="80">
        <b-button
          type="is-primary"
          icon-left="pencil"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [],
    selected: null
  }),

  created () {
    this.fetchData();
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get('/departamentos');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    }
  }
}
</script>