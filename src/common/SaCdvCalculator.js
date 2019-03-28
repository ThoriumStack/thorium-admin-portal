import cdvMatrix from './SaCdvLookup'

function GetBankNumberCdvMatrix(bankRefId, bankBranchRefId, bankAccountType) {
  let result = cdvMatrix.filter(_ => _.Status === 1 && _.BankRefId === bankRefId && _.BranchRefId === bankBranchRefId && _.AccountType === bankAccountType).first();

  if (!result) {
    result = cdvMatrix.filter(_ => _.Status === 1 && _.BankRefId === bankRefId && _.BranchRefId === bankBranchRefId && _.AccountType == null).first();
  }

  if (!result) {
    result = cdvMatrix.filter(_ => _.Status === 1 && _.BankRefId === bankRefId && _.BranchRefId == null && _.AccountType === bankAccountType).first();
  }

  if (!result) {
    return cdvMatrix.filter(_ => _.Status === 1 && _.BankRefId === bankRefId && _.BranchRefId == null && _.AccountType == null).first();
  }

  return result;
}


/**
 *
 * @param accountNumber
 * @param accountType
 * @param accountIndicator
 * @param weightingDigits
 * @param fudgeFactor
 * @param modulus
 * @param exceptCode
 * @param validLengths
 * @returns {boolean}
 * @constructor
 */
function IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, weightingDigits, fudgeFactor, modulus,
                                        exceptCode, validLengths) {
  if (accountIndicator === 0)
    return true;
  if (validLengths && validLengths.length > 0) {

    let validLengthList = validLengths.split(',');
    let isValidLength = false;

    for (let validLength of validLengthList) {
      let lengthVal = parseInt(validLength);
      if (accountNumber.length === lengthVal)
        isValidLength = true;
    }

    if (!isValidLength)
      return false;
  }

  if (exceptCode === "f") {
    if (accountNumber.length === 11 && accountNumber.startsWith("53") &&
      IsValidRsaAccountNumber(accountNumber, 2, 4, "00000000000", 0, 0, null, validLengths))
      return true;
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "17329874321", 0, 10, null, validLengths))
      return true;
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "14327654321", 0, 11, null, validLengths))
      return true;
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "54327654321", 0, 11, "ff", validLengths))
      return true;
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "11327654321", 0, 11, null, validLengths))
      return true;
    if (accountNumber.length < 10) {
      if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "11327654321", 0, 11, "fff", validLengths))
        return true;
    }
    return IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "14329874321", 0, 10, null, validLengths);
  }

  if (exceptCode === "i") {
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, weightingDigits, fudgeFactor, modulus, null, validLengths))
      return true;

    return IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "DCBA987654321", 0, 11, null, validLengths);
  }

  if (exceptCode === "m") {
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, weightingDigits, fudgeFactor, modulus, null, validLengths))
      return true;

    return IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "DC987654321", 0, 11, null, validLengths);
  }

  if (exceptCode === "n") {
    if (IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, weightingDigits, fudgeFactor, modulus, null, validLengths))
      return true;

    if (!accountNumber.startsWith("6"))
      return false;

    return IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "DC987654321", 0, 11, null, validLengths);
  }

  if (accountNumber.length < weightingDigits.length)
    accountNumber = accountNumber.padStart(weightingDigits.length, '0');

  if (weightingDigits.length < accountNumber.length)
    weightingDigits = weightingDigits.padStart(accountNumber.length, '0');

  let sumTotal = 0;

  let pos = accountNumber.length - 1;
  while (pos >= 0) {
    let accDigit = parseInt(accountNumber[pos]);
    let weightDigit = parseInt(weightingDigits[pos]);
    if (isNaN(weightDigit))
      weightDigit = weightingDigits.toUpper()[pos] - 55;

    if (exceptCode === "fff" && pos === accountNumber.length - 1) {
      accDigit += 6;
      if (accDigit > 10)
        accDigit = accDigit - 10;
    }

    sumTotal += accDigit * weightDigit;
    pos--;
  }
  let moduloResult = (sumTotal + fudgeFactor) === 0 && modulus === 0 ? 0 : (sumTotal + fudgeFactor) % modulus;

  if (exceptCode === "ff" && moduloResult === 1 && (accountNumber.endsWith("0") || accountNumber.endsWith("1"))) {
    return true;
  }
  if (exceptCode === "p" && moduloResult !== 0 && accountType === 2) {
    weightingDigits = "14329874321";
    fudgeFactor = 0;
    modulus = 10;

    sumTotal = 0;

    pos = accountNumber.length - 1;
    while (pos >= 0) {
      let accDigit = parseInt(accountNumber[pos]);
      let weightDigit = parseInt(weightingDigits[pos]);
      if (isNaN(weightDigit))
        weightDigit = weightingDigits.toUpper()[pos] - 64;

      sumTotal += accDigit * weightDigit;
      pos--;
    }

    if ((sumTotal + fudgeFactor) === 0)
      return false;

    moduloResult = (sumTotal + fudgeFactor) % modulus;
  }

  // FNB Override
  if ((moduloResult !== 0) && weightingDigits.contains("12121212121") && (accountType === 1)) {
    return IsValidRsaAccountNumber(accountNumber, accountType, accountIndicator, "DA987654321", 0, 11, null, validLengths);
  }

  return moduloResult === 0;
}


export function ProcessBankAccountCdvValidation(bankingDetailsViewModel)
{
  let result = true;


    let cdvMatrixEntry = GetBankNumberCdvMatrix(bankingDetailsViewModel.BankRefId, bankingDetailsViewModel.BankBranchRefId, bankingDetailsViewModel.BankAccountType);
    if (cdvMatrixEntry != null)
    {
      if (!IsValidRsaAccountNumber(bankingDetailsViewModel.BankAccount, bankingDetailsViewModel.BankAccountType,
        cdvMatrixEntry.AccountIndicator || 0, cdvMatrixEntry.WeightingDigits, cdvMatrixEntry.FudgeFactor || 0, cdvMatrixEntry.Modulus || 0,
        cdvMatrixEntry.ExceptCode, cdvMatrixEntry.ValidLengths))
      {
        return false;
      }

    }



  return result;
}