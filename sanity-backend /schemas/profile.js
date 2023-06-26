export default {
  name: 'profile',
  type: 'document',
  title: 'Profile',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
    },
    {
      name: 'headingContent',
      type: 'string',
      title: 'hcontent',
    },
    {
      title: 'Frontend',
      name: 'frontend',
      type: 'object',
      fields: [
        {name: 'street', type: 'string', title: 'Street name'},
        {name: 'streetNo', type: 'string', title: 'Street number'},
        {name: 'city', type: 'string', title: 'City'},
      ],
    },
    {
      title: 'Backend',
      name: 'bbackend',
      type: 'object',
      fields: [
        {
          name: 'street',
          type: 'string',
          title: 'Street name',
          description:
            'Timestamp the movie was last synced with external service. Not shown in studio.',
        },
        {name: 'streetNo', type: 'string', title: 'Street number'},
        {name: 'city', type: 'string', title: 'City'},
      ],
    },
  ],
}
