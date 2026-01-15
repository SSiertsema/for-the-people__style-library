export const validationConfigurationProp = {
  type: Array,
  validator(rules) {
    let isValid = true;
    const messages = [];
    for (let [index, rule] of rules.entries()) {
      if (typeof rule.type === "undefined") {
        isValid = false;
        messages.push(
          `- Missing mandatory attribute 'type' in item [${index}].`,
        );
      }
      if (typeof rule.message === "undefined") {
        isValid = false;
        messages.push(
          `- Missing mandatory attribute 'message' in item [${index}].`,
        );
      }
      if (
        typeof rule.pattern !== "undefined" &&
        rule.pattern instanceof RegExp === false
      ) {
        isValid = false;
        messages.push(
          `- Attribute 'pattern' in item [${index}] is given but is not a instance of RegExp. Make sure it does.`,
        );
      }
    }

    if (!isValid) {
      throw new Error(
        `\n\nValidation for prop 'validationConfiguration' went wrong: \n\n${messages.join(
          "\n",
        )} \n\nvalue given: \n${JSON.stringify(rules, {}, 2)}`,
      );
    }

    return true;
  },
};

export function validate(validationRules, value) {
  const validationReport = generateValidationReport(validationRules, value);
  return validationReport;
}

export function generateValidationReport(validationRules, value) {
  const validationReport = {
    isValid: true,
    messages: [],
    testResults: [],
  };

  if (typeof validationRules === "undefined") {
    return validationReport;
  }

  for (let rule of validationRules) {
    const testResult = testValueAgainstRule(rule, value);
    validationReport.testResults.push(testResult);
  }

  for (let testResult of validationReport.testResults) {
    if (!testResult.isValid) {
      validationReport.isValid = false;
      validationReport.messages.push(testResult.rule.message);
    }
  }

  return validationReport;
}

function testValueAgainstRule(rule, value) {
  const result = {
    rule,
    value,
  };

  switch (rule.type) {
    case "required":
      result.isValid = hasValue(value);
      break;
    case "pattern":
      result.isValid = rule.pattern.test(value);
      break;
  }

  return result;
}

function hasValue(value) {
  if (typeof value === "undefined") return false;
  if (value === null) return false;
  return String(value).trim().length > 0;
}
