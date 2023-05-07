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
        <nuxt-link :to="{ path: `/departamentos/${props.row.nombre}/data` }">
          {{ props.row.nombre }}
        </nuxt-link>
      </b-table-column>
      <b-table-column label="Datos" v-slot="props" width="80">
        <b-button
          type="is-info"
          icon-left="information"
          @click="$menu(`/departamentos/${props.row.iddep}/data`)"
        />
      </b-table-column>
      <b-table-column label="Editar" v-slot="props" width="80">
        <b-button
          type="is-warning"
          icon-left="pencil"
          @click="$menu(`/departamentos/${props.row.iddep}/edit`)"
        />
      </b-table-column>
      <b-table-column label="Eliminar" v-slot="props" width="80">
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="confirmDelete(props.row.iddep)"
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

    async delete (iddep) {
      try {
        await this.$axios.$delete(`/departamentos/${iddep}`);
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
    confirmDelete (iddep) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(iddep) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>