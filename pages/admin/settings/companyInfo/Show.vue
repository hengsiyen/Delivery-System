<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink
              class="btn btn-primary btn-sm"
              :to="{name: 'edit-company-info', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <div v-if="company_info" class="row">
            <div class="col-lg-8 col-xl-8">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th>{{ $t('label.companyNameKm') }}</th>
                    <td>{{ company_info.name_km ? company_info.name_km : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.companyNameEn') }}</th>
                    <td>{{ company_info.name_en ? company_info.name_en : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.phone') }}</th>
                    <td>{{ company_info.phone ? company_info.phone : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.email') }}</th>
                    <td>{{ company_info.email ? company_info.email : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.address') }}</th>
                    <td>{{ company_info['address_' + $i18n.locale] ? company_info['address_' + $i18n.locale] : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.description') }}</th>
                    <td>{{ company_info.description ? company_info.description : '-' }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.createdAt') }}</th>
                    <td>{{ getDateFormat(company_info.created_at) }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('label.lastUpdatedAt') }}</th>
                    <td>{{ getDateFormat(company_info.updated_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-4 col-xl-4">
              <div class="w-75 mx-auto text-center">
                <template v-if="company_info.logo">
                  <img :src="getSrc(company_info.logo)" alt="" class="img-thumbnail">
                </template>
                <template v-else>
                  <img :src="logo_icon" alt="" class="img-thumbnail">
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title">
            {{ $t('table.companyHistory') }}
          </h3>
        </div>
        <div class="card-body">
          <Datatable
            ref="oTable"
            :columns="columns"
            :params="params"
            table-id="currency-table"
            url="api/backend/delivery-company/history"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import { mapGetters } from 'vuex'
import Datatable from '@/components/Datatable'
export default {
  name: 'Show',
  components: { Datatable, ButtonBack },
  head () {
    return {
      title: this.$t('title.showCompanyInfo'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    params () {
      return {
        dcid: this.dcid,
        lang: this.$i18n.locale,
        show: this.$t('label.show')
      }
    },
    columns () {
      return [
        { data: 'editor', name: 'editor', title: this.$t('table.editedBy') },
        {
          data: 'created_at',
          name: 'created_at',
          searchable: false,
          title: this.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        },
        {
          data: 'actions',
          name: 'actions',
          searchable: false,
          orderable: false,
          title: this.$t('label.action')
        }
      ]
    }
  },
  data () {
    return {
      company_info: []
    }
  },
  mounted () {
    this.$isLoading(true)
    this.getCompanyInfo()
  },
  methods: {
    getCompanyInfo () {
      this.$axios.post(this.$base_api + '/api/backend/delivery-company/show', {
        dcid: this.dcid
      }).then((res) => {
        this.company_info = res.data.data
      }).catch((error) => {
        this.onResponseError(error)
      }).finally(() => {
        this.$isLoading(false)
      })
    }
  }
}
</script>

<style scoped>

</style>
