export {};

declare global {
  interface CustomJwtSessionClaims {
    onBoarded: false;
    fullName: string;
    unitId: null | string;
    staffId: null | string;
    emailVerified: boolean;
    vendorId: null | string;
    inVitedBy: null | string;
    hasDefaultPassword: boolean;
    userType: "staff" | "vendor" | "admin";

    inviteMetadata?: {
      email: string;
      invitedBy: string;
    };
  }
}
