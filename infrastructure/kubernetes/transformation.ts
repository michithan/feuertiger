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

export const transformation = (name: string) => ({
    metadata,
    apiVersion
}: any) => {
    metadata.name = metadata?.name?.replace(`${name}-`, '');
    apiVersion = deprecations[apiVersion] || apiVersion;
};
