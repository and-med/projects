import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { IProfileFormValues, IProfile } from '../../app/models/profile';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';

const validate = combineValidators({
    displayName: isRequired('Display Name'),
});

interface IProps {
    profile: IProfile
    loading: boolean;
    updateProfile: (profile: IProfileFormValues) => void;
}

const ProfileEditForm: React.FC<IProps> = ({ loading, updateProfile, profile }) => {
    return (
        <Segment basic clearing>
            <FinalForm
                validate={validate}
                initialValues={profile}
                onSubmit={updateProfile}
                render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name='displayName'
                            placeholder='Display Name'
                            value={profile.displayName}
                            component={TextInput}
                        />
                        <Field
                            name='bio'
                            placeholder='Bio'
                            rows={3}
                            value={profile.bio}
                            component={TextAreaInput}
                        />
                        <Button
                            loading={loading}
                            disabled={loading || invalid || pristine}
                            floated='right'
                            positive
                            type='submit'
                            content='Update Profile'
                        />
                    </Form>
                )}
            />
        </Segment>
    );
};

export default ProfileEditForm;
