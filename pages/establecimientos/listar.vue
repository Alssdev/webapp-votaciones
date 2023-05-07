<template>
  <div>
    <h1 class="title">Lista de Establecimientos</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >

    <b-table-column field="idest" label="ID" sortable v-slot="props">
      {{ props.row.idest }}
    </b-table-column>
    <b-table-column field="nombre" label="Nombre" searchable v-slot="props">
      {{ props.row.nombre }}
    </b-table-column>
    <b-table-column field="municipio.depto.nombre" label="Departamento" searchable sortable v-slot="props">
      {{ props.row.municipio.depto.nombre }}
    </b-table-column>
    <b-table-column field="municipio.nombre" label="Municipio" searchable sortable v-slot="props">
      {{ props.row.municipio.nombre }}
    </b-table-column>
    <b-table-column label="Datos" v-slot="props" width="80">
      <b-button
        type="is-info"
        icon-left="information"
        @click="$menu(`/establecimientos/${props.row.idest}/data`)"
      />
    </b-table-column>
    <b-table-column label="Editar" v-slot="props" width="80">
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/establecimientos/${props.row.idest}/edit`)"
      />
    </b-table-column>
    <b-table-column label="Eliminar" v-slot="props" width="80">
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete(props.row.idest)"
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
        const response = await this.$axios.$get('/establecimientos');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idest) {
      try {
        await this.$axios.delete(`/establecimientos/${idest}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El establecimiento ha sido borrado con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (idest) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(idest) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>