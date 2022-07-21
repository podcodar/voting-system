/**
 * @swagger
 * components:
 *  schemas:
 *    AvailableElectionsResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        name:
 *          type: string
 *        parent:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */

export interface AvailableElectionsResponse {
  name: string;
}
