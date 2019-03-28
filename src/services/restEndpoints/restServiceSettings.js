
const baseUrl = process.env.VUE_APP_BASE_URL;
const serviceSettings =
  {
    "ClaimDocumentsClient": "/insurance/claims/documents",
    "ClaimsClient": "/insurance/claims",
    "ClaimLookupClient": "/insurance/claims/lookups",
    "FuneralClaimsClient": "/insurance/claims/funeral-claims",
    "BankingDetailClient": "/bankingdetails",
    "PoliciesClient": "/insurance/policies",
    "PolicyMemberClient": "/insurance/policy-members",
    "PolicyQuoteClient": "/insurance/quotes",
    "ProductsClient": "/insurance/products",
    "ProductPackageClient": "/insurance/packages",
    "ProductCoverClient": "/insurance/covers",
    "ProductPremiumsClient": "/insurance/product-premiums",
    "ProductPackageRequirementsClient": "/insurance/package-requirements",
    "ProductMemberRequirementsClient": "/insurance/member-requirements",
    "BeneficiariesClient": "",
    "TemplateAdminClient": "/templates",
    "FileStorageClient": "/files",
    "PolicyDocumentClient": "/insurance/policies",
    "PremiumClient": "/insurance/premiums",
    "AuthorizationAdminClient": "/authorization",
    "UsersClient": "/users",
    "AuthClient": "/auth",
    "GuardRiskClient": "/insurance/policies/guardrisk",
    "DebitOrderAdminClient": "/debitorders/admin",
    "ProductDocumentClient": "/insurance/products",
    "PremiumReportingClient": "/insurance/premiums/reports",
    "PremiumDeductionClient": "/insurance/premiums/deductions",



      "ContactDetailClient": "/contact-details"
  };


export default function (serviceKey) {
  return `${baseUrl}${serviceSettings[serviceKey]}` ;
}



