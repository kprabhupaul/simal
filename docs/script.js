(() => {
    const demos = {
        basic: () => {
            simal.fire({
                title: 'Hello from Simal!',
                text: 'This dialog is running from the Simal documentation page.',
                icon: 'info'
            });
        },

        success: () => {
            simal.fire({
                title: 'Success!',
                text: 'Your changes were saved successfully.',
                icon: 'success'
            });
        },

        confirm: async () => {
            const result = await simal.fire({
                title: 'Delete item?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                simal.fire({
                    title: 'Deleted',
                    text: 'The item was deleted.',
                    icon: 'success'
                });
            }
        },

        deny: async () => {
            const result = await simal.fire({
                title: 'Choose an action',
                text: 'What would you like to do?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: 'Discard',
                cancelButtonText: 'Cancel',
                preDeny: () => 'discarded'
            });

            if (result.isDenied) {
                simal.fire({
                    title: 'Discarded',
                    text: `Result value: ${result.value}`,
                    icon: 'info'
                });
            }
        },

        html: () => {
            simal.fire({
                title: 'HTML content',
                html: '<strong>Hello!</strong><br><br>This content is rendered as HTML.'
            });
        },

        form: async () => {
            const result = await simal.fire({
                title: 'Create account',
                html: `
                    <form>
                        <input
                            name="name"
                            required
                            minlength="3"
                            placeholder="Your name"
                        >
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                        >
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Create',
                preConfirm: (values) => values
            });

            if (result.isConfirmed) {
                simal.fire({
                    title: 'Form submitted',
                    html: `<strong>Name:</strong> ${result.value.name}<br>
                           <strong>Email:</strong> ${result.value.email}`,
                    icon: 'success'
                });
            }
        },

        validation: () => {
            simal.fire({
                title: 'Validation example',
                html: `
                    <form>
                        <input
                            name="name"
                            required
                            placeholder="Try typing: admin"
                        >
                    </form>
                `,
                preConfirm: async (values) => {
                    if (values.name.toLowerCase() === 'admin') {
                        simal.showValidationMessage(
                            'The name "admin" is not allowed.'
                        );
                        return;
                    }

                    return values;
                }
            });
        },

        lifecycle: () => {
            simal.fire({
                title: 'Lifecycle hooks',
                text: 'Open the browser console to see the hook sequence.',
                preOpen: (dialog) => console.log('Simal preOpen', dialog),
                didOpen: (dialog) => console.log('Simal didOpen', dialog),
                preClose: (dialog) => console.log('Simal preClose', dialog),
                didClose: (dialog) => console.log('Simal didClose', dialog)
            });
        },

        predeny: async () => {
            const result = await simal.fire({
                title: 'Discard changes?',
                text: 'The Deny action uses preDeny().',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Keep',
                denyButtonText: 'Discard',
                cancelButtonText: 'Cancel',
                preDeny: async () => {
                    return 'discarded';
                }
            });

            if (result.isDenied) {
                simal.fire({
                    title: 'Changes discarded',
                    text: `preDeny returned: ${result.value}`,
                    icon: 'success'
                });
            }
        }
    };

    document.querySelectorAll('[data-demo]').forEach((button) => {
        button.addEventListener('click', () => {
            const demo = demos[button.dataset.demo];

            if (typeof demo === 'function') {
                demo();
            }
        });
    });
})();
