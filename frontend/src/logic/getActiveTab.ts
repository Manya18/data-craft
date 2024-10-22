export const isTabActive = (tabName: string) => {
    const linkParts = window.location.pathname.split('/');
    console.log(linkParts)
    return linkParts.includes(tabName)
}