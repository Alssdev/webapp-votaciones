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
      <b-table-column label="Eliminar" v-slot="props" width="80">
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="confirmDelete(props.row.nombre)"
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
    },

    async delete (nombre) {
      try {
        await this.$axios.$delete(`/departamentos/${nombre}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El deparamento ha sido borrado con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (nombre) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(nombre) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>