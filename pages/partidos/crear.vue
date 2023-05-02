<template>
  <div>
    <h1 class="title">Crear un partido político</h1>

    <b-field grouped>
      <b-field label="Nombre" expanded>
        <b-input maxlenght="50" placeholder="Nombre del partido" />
      </b-field>
      <b-field label="Acrónimo">
        <b-input maxlenght="5" placeholder="ABC" />
      </b-field>
    </b-field>
    <b-field label="Secretario general">
      <input-ciudadano />
    </b-field>

    <hr />
      <b-field>
        <b-upload v-model="logo" drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Suelte la imágen de logo aquí.</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    <hr />
  </div>
</template>

<script>
export default {
  data: () => ({
    logo: null,
  })
}
</script>