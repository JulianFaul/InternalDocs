<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>Edit Project Details</h1>
            </div>
        </div>

        <div class='scroll-container'>
            <div class='content-container'>
                <MobileProjectDetailsForm :projectID="id" :projectDetailsData="projectDetailsData" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectDetailsForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectDetailsForm from './MobileProjectDetailsForm';

export default {
  name: 'EditMobileProjectDetailsPage',
  props: ["id"],
  components:{
      MobileProjectDetailsForm
  },
  data () {
    return {
        buttonText: 'Update Project Details',
        projectDetailsData:{
                usedBy: [],
                devices: [],
                stores: [],
                generatedDoc: '',
                multiPricelist: '',
                multiPricelistDate: '',
                priceListDetails: '',
                priceListFiles: [],
                existingPriceListFiles: '',
                setStatus: '',
                setStatusDate: '',
                setStatusDetails:'',
                setStatusFiles: [],
                existingSetStatusFiles: '',
                listOfRepFile: '',
                listOfRepFileDate: '',
                listOfCustomerFile: '',
                listOfCustomerFileDate: '',
                maintenanceContactName: '',
                maintenanceContactEmail: '',
                quoteRequestDetails: [],
                contactMeDetails: [],
                specialComments: '',
                dueDate: ''
        }
    }
  },
  computed:{
  },
  methods: {
        onSubmit(payload) {
           console.log("submit this", payload)
    }
  }
}
</script>

