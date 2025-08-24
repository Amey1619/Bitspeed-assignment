// src/services/contactService.ts
import prisma from "../utils/prisma";
import { IdentifyResponse } from "../types/contact";
export async function identifyContact(
  email?: string,
  phoneNumber?: string
): Promise<IdentifyResponse> {
  if (!email && !phoneNumber) {
    throw new Error("Either email or phoneNumber is required");
  }

  // 1. Find existing contacts
  const existingContacts = await prisma.contact.findMany({
    where: {
      OR: [email ? { email } : {}, phoneNumber ? { phoneNumber } : {}],
    },
    orderBy: { createdAt: "asc" },
  });

  let primaryContact;
  let allContacts;

  if (existingContacts.length === 0) {
    // Case: No contact → create primary
    primaryContact = await prisma.contact.create({
      data: { email, phoneNumber, linkPrecedence: "PRIMARY" },
    });
    allContacts = [primaryContact];
  } else {
    // Oldest primary
    primaryContact =
      existingContacts.find((c: { linkPrecedence: string; }) => c.linkPrecedence === "PRIMARY") ||
      existingContacts[0];

    // Ensure only one primary
    for (const contact of existingContacts) {
      if (
        contact.id !== primaryContact.id &&
        contact.linkPrecedence === "PRIMARY"
      ) {
        await prisma.contact.update({
          where: { id: contact.id },
          data: { linkPrecedence: "SECONDARY", linkedId: primaryContact.id },
        });
      }
    }

    // Case: new info provided
    const hasEmail = existingContacts.some((c) => c.email === email);
    const hasPhone = existingContacts.some(
      (c) => c.phoneNumber === phoneNumber
    );

    if ((!hasEmail && email) || (!hasPhone && phoneNumber)) {
      await prisma.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: "SECONDARY",
          linkedId: primaryContact.id,
        },
      });
    }

    // Reload all linked
    allContacts = await prisma.contact.findMany({
      where: {
        OR: [{ id: primaryContact.id }, { linkedId: primaryContact.id }],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  // Consolidate response
  const emails = Array.from(
    new Set(allContacts.map((c: { email: any; }) => c.email).filter(Boolean))
  ) as string[];

  const phoneNumbers = Array.from(
    new Set(allContacts.map((c: { phoneNumber: any; }) => c.phoneNumber).filter(Boolean))
  ) as string[];

  const secondaryContactIds = allContacts
    .filter((c: { linkPrecedence: string; }) => c.linkPrecedence === "SECONDARY")
    .map((c: { id: any; }) => c.id);

  return {
    contact: {
      primaryContatctId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
    },
  };
}
