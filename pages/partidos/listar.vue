<template>
  <div>
    <h1 class="title">Lista de Mesas</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
      <b-table-column field="acronimo" label="Acrónimo" searchable v-slot="props">
        {{ props.row.acronimo }}
      </b-table-column>
      <b-table-column field="nombre" label="Nombre" searchable v-slot="props">
        {{ props.row.nombre }}
      </b-table-column>
      <b-table-column label="Datos" v-slot="props" width="80">
      <b-button
        type="is-info"
        icon-left="information"
        @click="$menu(`/partidos/${props.row.idpartido}/data`)"
      />
    </b-table-column>
    <b-table-column label="Editar" v-slot="props" width="80">
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/partidos/${props.row.idpartido}/edit`)"
      />
    </b-table-column>
    <b-table-column label="Eliminar" v-slot="props" width="80">
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete(props.row.idpartido)"
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
        const response = await this.$axios.$get('/partidos');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idpartido) {
      try {
        await this.$axios.delete(`/partidos/${idpartido}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El partido ha sido borrado con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (idpartido) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(idpartido) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>