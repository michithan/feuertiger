/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */

const deprecations: { [key: string]: string } = {
    'admissionregistration.k8s.io/v1beta1/ValidatingWebhookConfiguration':
        'admissionregistration.k8s.io/v1/ValidatingWebhookConfiguration',
    'admissionregistration.k8s.io/v1beta1/MutatingWebhookConfiguration':
        'admissionregistration.k8s.io/v1/MutatingWebhookConfiguration',
    'rbac.authorization.k8s.io/v1beta1/Role':
        'rbac.authorization.k8s.io/v1beta1/Role',
    'rbac.authorization.k8s.io/v1beta1/ClusterRoleBinding':
        'rbac.authorization.k8s.io/v1/ClusterRoleBinding',
    'rbac.authorization.k8s.io/v1beta1/RoleBinding':
        'rbac.authorization.k8s.io/v1/RoleBinding',
    'rbac.authorization.k8s.io/v1beta1/ClusterRole':
        'rbac.authorization.k8s.io/v1/ClusterRole',
    'apiextensions.k8s.io/v1beta1/CustomResourceDefinition':
        'apiextensions.k8s.io/v1/CustomResourceDefinition'
};

const fix = ([key, value]: [string, any]) => {
    if (typeof value === 'string' && key === 'apiVersion') {
        value = deprecations[value] || value;
    } else if (Array.isArray(value)) {
        value.map((element, index) => fix([element, index.toString()]));
    } else if (typeof value === 'object') {
        Object.entries(value).forEach(fix);
    }
};

export const transformation = (name: string) => (yaml: any) => {
    yaml.name = yaml?.name?.replace(`${name}-`, '');
    Object.entries(yaml).forEach((entry) => fix(entry));
};
