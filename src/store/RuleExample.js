const memberRules = {
  'main_member': {
    min_age: 18,
    max_age: 65,
    rules: [
      {type: 'empty', prompt: 'validation_date_of_birth_required'},
    ]
  }
}

const productGroupRules = {
  funeral: {
    min_beneficiaries: 1
  },
  legal: {
    min_beneficiaries: 0
  }
}