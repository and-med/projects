import React, { useContext, useState } from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        profile,
        isCurrentUser,
        updateProfile,
        loading,
    } = rootStore.profileStore;
    const [editProfileMode, setEditProfileMode] = useState(false);

    const handleUpdateProfile = (profile: any) => {
        updateProfile(profile).then(() => {
            setEditProfileMode(false);
        });
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header
                        floated='left'
                        icon='user'
                        content={`About ${profile!.displayName}`}
                    />
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            basic
                            content={
                                editProfileMode ? 'Cancel' : 'Edit Profile'
                            }
                            onClick={() => setEditProfileMode(!editProfileMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editProfileMode ? (
                        <ProfileEditForm
                            updateProfile={handleUpdateProfile}
                            loading={loading}
                            profile={profile!}
                        />
                    ) : (
                        profile!.bio
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileDescription);
