<template>
  <b-sidebar
    type="is-light"
    position="static"
    fullwidth
    open
  >
    <div class="p-4">
      <b-menu>
        <b-menu-list label="Inicio">
          <b-menu-item icon="home" label="Incio" @click="$menu('/')" />
        </b-menu-list>  
        <b-menu-list label="Administración">
          <b-menu-item icon="earth" label="Departamentos">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/departamentos/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/departamentos/listar')" />
          </b-menu-item>
          <b-menu-item icon="earth" label="Municipios">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/municipios/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/municipios/listar')" />
          </b-menu-item>
          <b-menu-item icon="office-building" label="Establecimientos">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/establecimientos/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/establecimientos/listar')" />
          </b-menu-item>
          <b-menu-item icon="package-variant" label="Mesas">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/mesas/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/mesas/listar')" />
          </b-menu-item>
          <b-menu-item icon="badge-account" label="Voluntarios">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/voluntarios/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/voluntarios/listar')" />
          </b-menu-item>
          <b-menu-item icon="account-group" label="Partidos políticos">
            <b-menu-item icon="pencil" label="Crear" @click="$menu('/partidos/crear')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/partidos/listar')" />
            <b-menu-item icon="badge-account" label="Candidatos" @click="$menu('/partidos/candidatos')" />
          </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Empadronamiento">
          <b-menu-item icon="account-multiple-check" label="Ciudadanos">
            <b-menu-item icon="pencil" label="Registrar" @click="$menu('/ciudadanos/empadronar')" />
            <b-menu-item icon="magnify" label="Ver lista" @click="$menu('/ciudadanos/listar')" />
          </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Votos">
          <b-menu-item icon="file-document-edit" label="Registro de votos">
            <b-menu-item icon="form-select" label="Presidencia" @click="$menu('/votos/register?tipo=P')" />
            <b-menu-item icon="form-select" label="Alcaldía" @click="$menu('/votos/register?tipo=A')" />
            <b-menu-item icon="form-select" label="Diputados de Distrito" @click="$menu('/votos/register?tipo=D')" />
            <b-menu-item icon="form-select" label="Listado Nacional" @click="$menu('/votos/register?tipo=N')" />
          </b-menu-item>
        </b-menu-list>  
        <b-menu-list label="Reportes">
          <b-menu-item icon="" label="Pendiente..."></b-menu-item>
        </b-menu-list>  
      </b-menu>    
    </div>
  </b-sidebar>
</template>

<script>
export default {

}
</script>