import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile'
import { SearchBox } from './SearchBox';


//this will be the Header of our application
export function Header() {
    //this is to open the Sidebar on mobile
    const { onOpen } = useSidebarDrawer()

    //this is for when is in Mobile, just show the Avatar
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
        //the name and email will just be visible when go to lg
    })

    return (
        <Flex 
            as="header" 
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >

            { !isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            ) }

            <Logo />

            
            { isWideVersion && <SearchBox />
            // this will just show the SearchBox in Desktop, not in mobile 
            }

            <Flex align="center" ml="auto">
                <NotificationsNav />
            
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}