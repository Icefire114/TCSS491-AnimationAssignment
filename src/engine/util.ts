/**
 * Sleeps for the given number of miliseconds.
 * @param ms The number of miliseconds to sleep for
 */
export async function sleep(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
}